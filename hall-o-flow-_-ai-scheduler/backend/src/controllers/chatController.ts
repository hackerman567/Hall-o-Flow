import { getDatabase } from '../middleware/database.js';
import { ObjectId } from 'mongodb';
import * as scheduleController from './scheduleController.js';

export const processQuery = async (req: any, res: any) => {
  try {
    const { query, userId } = req.body;
    const db = getDatabase();
    const lowQuery = query.toLowerCase();
    
    let reply = "I'm sorry, I didn't quite catch that. Could you rephrase your query?";
    let data = null;

    // 1. Timetable Queries
    if (lowQuery.includes('class') || lowQuery.includes('timetable') || lowQuery.includes('schedule')) {
      const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      const targetDay = days.find(day => lowQuery.includes(day));
      
      if (targetDay) {
        // Hardcoded response for demo/use-case consistency
        const dayClasses: any = {
          'monday': 'Maths IV, Data Structures, OS, and DBMS Lab',
          'tuesday': 'Open Elective, Microprocessors, Software Engineering, and TOC',
          'wednesday': 'Analog Circuits, Digital Logic, and Theory of Computation',
          'thursday': 'Computer Networks and AI Essentials',
          'friday': 'Database Design and Ethics in Tech',
          'saturday': 'Mini Project Review and Technical Seminar'
        };
        reply = `On ${targetDay.charAt(0).toUpperCase() + targetDay.slice(1)}, you have: ${dayClasses[targetDay]}.`;
      } else {
        reply = "You have 4 classes today: Maths IV (9:00 AM), Data Structures (10:30 AM), Operating Systems (1:00 PM), and DBMS Lab (2:30 PM).";
      }
    }

    // 2. Task Queries
    else if (lowQuery.includes('task') || lowQuery.includes('pending') || lowQuery.includes('todo')) {
      const tasks = await db.collection('tasks').find({
        userId: new ObjectId(userId),
        completed: false
      }).toArray();

      if (tasks.length > 0) {
        const taskList = tasks.map((t: any) => t.title).join(', ');
        reply = `You have ${tasks.length} pending tasks: ${taskList}.`;
        data = tasks;
      } else {
        reply = "Great job! You have no pending tasks.";
      }
    }

    // 3. Study Plan Generation
    else if (lowQuery.includes('generate') && (lowQuery.includes('plan') || lowQuery.includes('study'))) {
       // We can call the schedule controller logic here
       reply = "Sure! I'm generating an optimized study plan for you right now...";
       // In a real implementation, we'd trigger the generation and return the result
    }

    res.json({ success: true, reply, data });
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};
