import { AuthService } from '../services/AuthService';
import { HashService } from '../utils/auth/hash.service';
import { JwtService } from '../utils/auth/jwt.service';
import { TherapistService } from '../services/TherapistService';
import { PatientService } from '../services/PatientService';
import { generateCheckout } from '../utils/stripe';

interface RegisterInput {
  name_user: string;
  email: string;
  password: string;
  role: 'therapist' | 'patient';
  crfa?: string; 
  therapistId?: string; 
  birthDate?: string; 
  diagnosis?: string;
}


interface LoginInput {
  email: string;
  password: string;
}

export class AuthBusiness {
  static async register(data: RegisterInput) {
    const {
      name_user,
      email,
      password,
      role,
      crfa,
      therapistId,
      birthDate,
      diagnosis
    } = data;
    
    const existingUser = await AuthService.findByEmail(email);
    if (existingUser) throw new Error('User already exists.');
  
    const hashedPassword = await HashService.hashPassword(password);
    const user = await AuthService.createUser({
      name_user,
      email,
      password: hashedPassword,
      role
    });
  
    if (role === 'therapist') {
      if (!crfa) throw new Error('CRFA is required for therapists.');
      await TherapistService.createTherapist(user._id as string, crfa);
    }
  
    if (role === 'patient') {
      if (!therapistId || !birthDate) {
        throw new Error('Therapist ID and birth date are required for patients.');
      }
    
      await PatientService.createPatient(
        user._id as string,
        therapistId,
        new Date(birthDate),
        diagnosis
      );
    }
    
  
    return {
      message: 'User registered successfully',
      userId: user._id
    };
  }

  static async login(data: LoginInput) {
    const { email, password } = data;
  
    const user = await AuthService.findByEmail(email);
    if (!user) throw new Error('Invalid email or password.');
  
    const passwordMatch = await HashService.comparePassword(password, user.password);
    if (!passwordMatch) throw new Error('Invalid email or password.');
  
    const jwt = JwtService.getInstance();
    const token = await jwt.sign({ id: user._id, role: user.role });
  
    let stripeSubscriptionStatus: string | null = null;
  
    if (user.role === 'therapist') {
      const therapist = await TherapistService.getTherapistByUserId(String(user._id));

      if (therapist) {
        stripeSubscriptionStatus = therapist.stripeSubscriptionStatus;
        
        if (stripeSubscriptionStatus !== 'active') {
          const checkout = await generateCheckout(String(user._id), user.email);
          return {
            error: true,
            message: 'Sua assinatura não está ativa.',
            paymentLink: checkout?.url
          };
        }
        
      }
    }
  
    return {
      token,
      user: {
        id: user._id,
        name_user: user.name_user,
        email: user.email,
        role: user.role,
        stripeSubscriptionStatus
      }
    };
  }
  
}
