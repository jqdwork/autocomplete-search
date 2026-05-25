export interface User {
  id: number;
  name: string;
  displayLabel: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}