//Lesson-01 Introduction to React
//Exercise: Build an "About Me" Component in this file

export default function StudentWork() {
  const name = 'Javier Gusart';
  const location = 'Houston, TX';
  const hobbies = [
    'Photography and Cinematography',
    'Building Web Applications',
    'Teaching and Mentoring Others',
    'Tennis',
    'Pokemon',
  ];

  return (
    <div>
      <h1>
        {name} from {location}
      </h1>
      <p>
        I am a bilingual learning and development professional who has always
        been drawn to the intersection of technology and people. It started with
        a Bachelor of Arts in Media Production at the University of Houston,
        where I fell in love with using technology to tell stories and connect
        with audiences. That led me to pursue a Master of Education in
        Curriculum and Instruction at the University of Houston, where I got
        deep into how people actually learn and how to design experiences that
        make knowledge stick. Those two worlds combined into a career where I
        design training programs, lead live broadcast productions, and help
        people feel confident with the tools in front of them. I recently
        completed the Full Stack Software Development program at UT Austin, and
        honestly it just made me hungrier. I love building things, solving real
        problems, and I am nowhere near done learning.
      </p>
      <h2>Things I am Into</h2>
      <ul>
        {hobbies.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        ))}
      </ul>
    </div>
  );
}
