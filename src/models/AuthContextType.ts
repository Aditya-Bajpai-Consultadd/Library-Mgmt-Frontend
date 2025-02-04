interface AuthContextType {
  username: string | null;
  role: string | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}
export default AuthContextType;
