export type User = {
  user_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  password_hashed: string;
  email: string;
  phone_number: string;
  last_update: string;
  is_active: string;
  address: string;
};

export type UserInfo = {
  address: string;
  email: string;
  full_name: string;
  phone_number: string;
  user_id: string;
  role: string;
  avatar: string;
};
