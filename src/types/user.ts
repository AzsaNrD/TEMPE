export interface User {
  npm: string;
  nama: string;
  email: string | undefined;
  role: 'mahasiswa' | 'dosen' | 'admin';
  gender: 'laki-laki' | 'perempuan';
}
