import { v4 as uuidv4 } from 'uuid';


export const PLAYERS = [
  { firstName: 'Jakub', lastName: 'Patrzykąt', points: 1, assists: 3, profileImage: '../../assets/profileImages/patrzykat.jpg' },
  { firstName: 'Bruno', lastName: 'Jamuła', points: 4, assists: 3, profileImage: '../../assets/profileImages/jamula.jpg' },
  { firstName: 'Łukasz', lastName: 'Szewczyk', points: 6, assists: 3, profileImage: '../../assets/profileImages/szewczyk.jpg' },
  { firstName: 'Michał', lastName: 'Muszyński', points: 9, assists: 3, profileImage: '../../assets/profileImages/muszynski.jpg' },
  { firstName: 'Zuzanna', lastName: 'Peplińska', points: 10, assists: 3, profileImage: '../../assets/profileImages/peplinska.jpg' },
  { firstName: 'Jan', lastName: 'Pepliński', points: 12, assists: 3, profileImage: '../../assets/profileImages/peplinski.jpg' },
  { firstName: 'Sylwia', lastName: 'Muszyńska', points: 14, assists: 3, profileImage: '../../assets/profileImages/muszynska.jpg' },
  { firstName: 'Arkadiusz', lastName: 'Krawczyk', points: 15, assists: 3, profileImage: '../../assets/profileImages/krawczyk.jpg' },
  { firstName: 'Gienek', lastName: 'Gietki', points: 99, assists: 0, profileImage: '../../assets/profileImages/gietki.jpg' },
  { firstName: 'Damian', lastName: 'Damian', points: 99, assists: 0, profileImage: '../../assets/profileImages/damian.jpg' },
  { firstName: 'Arkadiusz', lastName: 'Krawczyk', points: 15, assists: 3, profileImage: '../../assets/profileImages/krawczyk.jpg' },
  { firstName: 'Arkadiusz', lastName: 'Krawczyk', points: 15, assists: 3, profileImage: '../../assets/profileImages/krawczyk.jpg' },
  { firstName: 'Michał', lastName: 'Muszyński', points: 9, assists: 3, profileImage: '../../assets/profileImages/muszynski.jpg' },
  { firstName: 'Michał', lastName: 'Muszyński', points: 9, assists: 3, profileImage: '../../assets/profileImages/muszynski.jpg' },
  { firstName: 'Michał', lastName: 'Muszyński', points: 9, assists: 3, profileImage: '../../assets/profileImages/muszynski.jpg' },
  { firstName: 'Michał', lastName: 'Muszyński', points: 9, assists: 3, profileImage: '../../assets/profileImages/muszynski.jpg' },
].map(el => ({ ...el, id: uuidv4() }));
