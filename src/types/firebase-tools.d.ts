// types/firebase-tools.d.ts

declare module 'firebase-tools' {
  // Firebase Tools'ın sunduğu API'ye göre tipleri tanımlayın.

  // Örneğin, deploy fonksiyonu:
  export function deploy(options?: DeployOptions): Promise<void>;

  // Deploy seçenekleri arayüzü
  export interface DeployOptions {
    project?: string;
    only?: string;
    except?: string;
    // Diğer deploy seçenekleri
  }

  // Diğer Firebase Tools fonksiyonlarını ekleyebilirsiniz
  export function login(): Promise<void>;

  export function logout(): Promise<void>;

  // Genel bir yapı örneği, gerçek API'ye göre düzenlenmelidir
}
