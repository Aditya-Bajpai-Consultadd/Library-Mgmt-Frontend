interface RegisterUser {
  username: string;
  password: string;
  role: "Admin" | "User";
}
export default RegisterUser;
