import { v4 as uuidv4 } from 'uuid';


export const PLAYERS = [
  {name: 'J.Patrzykąt', points: 1, assists: 3, profileImage: '../../assets/profileImages/patrzykat.jpg'},
  {name: 'B.Jamuła', points: 4, assists: 3, profileImage: '../../assets/profileImages/jamula.jpg'},
  {name: 'Ł.Szewczyk', points: 6, assists: 3,  profileImage: '../../assets/profileImages/szewczyk.jpg'},
  {name: 'M.Muszyński', points: 9, assists: 3,  profileImage: '../../assets/profileImages/muszynski.jpg'},
  {name: 'Z.Peplińska', points: 10, assists: 3,  profileImage: '../../assets/profileImages/peplinska.jpg'},
  {name: 'J.Pepliński', points: 12, assists: 3,  profileImage: '../../assets/profileImages/peplinski.jpg'},
  {name: 'S.Muszyńska', points: 14, assists: 3,  profileImage: '../../assets/profileImages/muszynska.jpg'},
  {name: 'A.Krawczyk', points: 15, assists: 3,  profileImage: '../../assets/profileImages/krawczyk.jpg'},
  {name: 'L.Gietki', points: 99, assists: 0,  profileImage: '../../assets/profileImages/gietki.jpg'},
  {name: 'D.Damian', points: 99, assists: 0,  profileImage: '../../assets/profileImages/damian.jpg'},
  {name: 'A.Krawczyk', points: 15, assists: 3,  profileImage: '../../assets/profileImages/krawczyk.jpg'},
  {name: 'A.Krawczyk', points: 15, assists: 3,  profileImage: '../../assets/profileImages/krawczyk.jpg'},
  {name: 'M.Muszyński', points: 9, assists: 3,  profileImage: '../../assets/profileImages/muszynski.jpg'},
  {name: 'M.Muszyński', points: 9, assists: 3,  profileImage: '../../assets/profileImages/muszynski.jpg'},
  {name: 'M.Muszyński', points: 9, assists: 3,  profileImage: '../../assets/profileImages/muszynski.jpg'},
  {name: 'M.Muszyński', points: 9, assists: 3,  profileImage: '../../assets/profileImages/muszynski.jpg'},
].map(el => ({...el, id: uuidv4()}));
