export interface Player {
  id: number;
  firstName: string;
  lastName: string;
  baseTeam?: string;
  points: number;
  assists: number;
  profileImage: string;
  teamId: number;
}
