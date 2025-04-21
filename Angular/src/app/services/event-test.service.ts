import { Injectable } from '@angular/core';

export interface EventData {
  id_event: number;
  nom: string;
  img: string;
  date: string;
  content: string;
  creator: string;
  lieu: string;
  ville: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventTestService {

  mockEvents: EventData[] = 
  [
    {
      "id_event": 1,
      "nom": "Math Workshop",
      "img": "math-workshop.jpg",
      "date": "2025-04-01",
      "content": "A workshop to improve math skills.",
      "creator": "Prof. John Doe",
      "lieu": "Room 101",
      "ville": "New York"
    },
    {
      "id_event": 2,
      "nom": "Science Fair",
      "img": "science-fair.jpg",
      "date": "2025-04-05",
      "content": "An exhibition of science projects.",
      "creator": "Prof. Jane Smith",
      "lieu": "Auditorium",
      "ville": "Los Angeles"
    },
    {
      "id_event": 3,
      "nom": "History Lecture",
      "img": "history-lecture.jpg",
      "date": "2025-04-10",
      "content": "A lecture on ancient civilizations.",
      "creator": "Prof. Emily Brown",
      "lieu": "Room 202",
      "ville": "Chicago"
    },
    {
      "id_event": 4,
      "nom": "Art Exhibition",
      "img": "art-exhibition.jpg",
      "date": "2025-04-12",
      "content": "Showcasing student artwork.",
      "creator": "Prof. Michael Green",
      "lieu": "Art Gallery",
      "ville": "San Francisco"
    },
    {
      "id_event": 5,
      "nom": "Coding Bootcamp",
      "img": "coding-bootcamp.jpg",
      "date": "2025-04-15",
      "content": "Learn the basics of programming.",
      "creator": "Prof. Sarah White",
      "lieu": "Computer Lab",
      "ville": "Seattle"
    },
    {
      "id_event": 6,
      "nom": "Music Recital",
      "img": "music-recital.jpg",
      "date": "2025-04-18",
      "content": "A recital by the music students.",
      "creator": "Prof. David Black",
      "lieu": "Music Hall",
      "ville": "Boston"
    },
    {
      "id_event": 7,
      "nom": "Physics Seminar",
      "img": "physics-seminar.jpg",
      "date": "2025-04-20",
      "content": "Exploring quantum mechanics.",
      "creator": "Prof. Laura Wilson",
      "lieu": "Room 303",
      "ville": "Houston"
    },
    {
      "id_event": 8,
      "nom": "Chemistry Lab",
      "img": "chemistry-lab.jpg",
      "date": "2025-04-22",
      "content": "Hands-on experiments in chemistry.",
      "creator": "Prof. Robert Martinez",
      "lieu": "Lab 1",
      "ville": "Phoenix"
    },
    {
      "id_event": 9,
      "nom": "Literature Discussion",
      "img": "literature-discussion.jpg",
      "date": "2025-04-25",
      "content": "Discussing classic literature.",
      "creator": "Prof. Anna Garcia",
      "lieu": "Library",
      "ville": "Philadelphia"
    },
    {
      "id_event": 10,
      "nom": "Sports Day",
      "img": "sports-day.jpg",
      "date": "2025-04-28",
      "content": "A day of sports and activities.",
      "creator": "Prof. Chris Lee",
      "lieu": "Sports Ground",
      "ville": "San Diego"
    },
    {
      "id_event": 11,
      "nom": "Drama Performance",
      "img": "drama-performance.jpg",
      "date": "2025-05-01",
      "content": "A play performed by the drama club.",
      "creator": "Prof. Karen Taylor",
      "lieu": "Auditorium",
      "ville": "Dallas"
    },
    {
      "id_event": 12,
      "nom": "Biology Field Trip",
      "img": "biology-field-trip.jpg",
      "date": "2025-05-03",
      "content": "Exploring local ecosystems.",
      "creator": "Prof. Daniel Harris",
      "lieu": "Nature Reserve",
      "ville": "Austin"
    },
    {
      "id_event": 13,
      "nom": "Robotics Competition",
      "img": "robotics-competition.jpg",
      "date": "2025-05-06",
      "content": "A competition for student-built robots.",
      "creator": "Prof. Megan Clark",
      "lieu": "Gymnasium",
      "ville": "San Jose"
    },
    {
      "id_event": 14,
      "nom": "Photography Workshop",
      "img": "photography-workshop.jpg",
      "date": "2025-05-08",
      "content": "Learn the art of photography.",
      "creator": "Prof. Andrew Lewis",
      "lieu": "Room 404",
      "ville": "Jacksonville"
    },
    {
      "id_event": 15,
      "nom": "Economics Debate",
      "img": "economics-debate.jpg",
      "date": "2025-05-10",
      "content": "Debating current economic issues.",
      "creator": "Prof. Olivia Walker",
      "lieu": "Room 505",
      "ville": "Fort Worth"
    },
    {
      "id_event": 16,
      "nom": "Astronomy Night",
      "img": "astronomy-night.jpg",
      "date": "2025-05-12",
      "content": "Stargazing and astronomy discussions.",
      "creator": "Prof. Ethan Hall",
      "lieu": "Observatory",
      "ville": "Columbus"
    },
    {
      "id_event": 17,
      "nom": "Creative Writing Workshop",
      "img": "creative-writing.jpg",
      "date": "2025-05-15",
      "content": "Improve your creative writing skills.",
      "creator": "Prof. Sophia Allen",
      "lieu": "Room 606",
      "ville": "Charlotte"
    },
    {
      "id_event": 18,
      "nom": "Environmental Awareness Day",
      "img": "environmental-awareness.jpg",
      "date": "2025-05-18",
      "content": "Activities to promote environmental awareness.",
      "creator": "Prof. Benjamin Young",
      "lieu": "Park",
      "ville": "Indianapolis"
    },
    {
      "id_event": 19,
      "nom": "French Language Workshop",
      "img": "french-workshop.jpg",
      "date": "2025-05-20",
      "content": "Learn basic French conversation skills.",
      "creator": "Prof. Isabella King",
      "lieu": "Room 707",
      "ville": "San Antonio"
    },
    {
      "id_event": 20,
      "nom": "Geography Quiz",
      "img": "geography-quiz.jpg",
      "date": "2025-05-22",
      "content": "Test your geography knowledge.",
      "creator": "Prof. Lucas Wright",
      "lieu": "Room 808",
      "ville": "Denver"
    },
    {
      "id_event": 21,
      "nom": "Public Speaking Seminar",
      "img": "public-speaking.jpg",
      "date": "2025-05-25",
      "content": "Improve your public speaking skills.",
      "creator": "Prof. Mia Scott",
      "lieu": "Room 909",
      "ville": "Washington"
    },
    {
      "id_event": 22,
      "nom": "Chess Tournament",
      "img": "chess-tournament.jpg",
      "date": "2025-05-28",
      "content": "Compete in a chess tournament.",
      "creator": "Prof. Elijah Adams",
      "lieu": "Room 1010",
      "ville": "Nashville"
    },
    {
      "id_event": 23,
      "nom": "Film Screening",
      "img": "film-screening.jpg",
      "date": "2025-06-01",
      "content": "Watch and discuss a classic film.",
      "creator": "Prof. Harper Nelson",
      "lieu": "Auditorium",
      "ville": "Baltimore"
    },
    {
      "id_event": 24,
      "nom": "Health and Wellness Fair",
      "img": "health-fair.jpg",
      "date": "2025-06-03",
      "content": "Promoting health and wellness.",
      "creator": "Prof. Amelia Carter",
      "lieu": "Gymnasium",
      "ville": "Louisville"
    },
    {
      "id_event": 25,
      "nom": "Debate Club Meeting",
      "img": "debate-club.jpg",
      "date": "2025-06-05",
      "content": "Discussing debate strategies.",
      "creator": "Prof. Henry Mitchell",
      "lieu": "Room 1111",
      "ville": "Milwaukee"
    },
    {
      "id_event": 26,
      "nom": "Cultural Festival",
      "img": "cultural-festival.jpg",
      "date": "2025-06-08",
      "content": "Celebrating cultural diversity.",
      "creator": "Prof. Evelyn Perez",
      "lieu": "Main Hall",
      "ville": "Portland"
    }
  ];

  constructor() { }

  getAllEvents(): EventData[] {
    return this.mockEvents
  }

  getPageOfAllEvents(pageNo: number): EventData[]{
    const pageSize = 10; // Number of events per page
    const startIndex = (pageNo - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return this.mockEvents.slice(startIndex, endIndex);
  }

  getUpcomingEvents(): EventData[]{
    return this.mockEvents.filter(event => new Date(event.date) > new Date());
  }

  getUserCreatedEvents(userName: string): EventData[]{
    return this.mockEvents.filter(event => event.creator === userName);
  }
}
