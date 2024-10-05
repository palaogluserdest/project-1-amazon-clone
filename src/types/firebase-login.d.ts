// types/firebase-login.d.ts

declare module 'firebase-login' {
  // Gerekli tipleri burada tanımlayın.

  // Örneğin, bir login fonksiyonu:
  export function login(email: string, password: string): Promise<User>;

  // User arayüzü
  export interface User {
    uid: string;
    email: string;
    displayName?: string;
    // Diğer kullanıcı özellikleri
  }

  // Opsiyonel olarak diğer fonksiyonları ve tipleri tanımlayabilirsiniz
  export function logout(): Promise<void>;

  export function onAuthStateChanged(callback: (user: User | null) => void): () => void;
}
