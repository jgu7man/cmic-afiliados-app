export interface iRol {
  name: Rol;
  displayName: string;
}

export interface iAccessInvitation {
  email: string;
  perfil:Rol
}

export type Rol = 'manager' | 'client' | 'admin'

export const rolCollectionMap: Map<Rol, string> = new Map([
  ['manager', 'managers'],
  ['client', 'clientes'],
  ['admin', 'admins']
])

