export default interface UserType {
  id: string;
  email: string;
  nama: string;
  password: string;
  confirmPassword?: string;
  role: string;
}
