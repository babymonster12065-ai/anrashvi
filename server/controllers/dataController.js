const getProjects = (req, res, next) => {
  try {
    const projects = [
      {
        id: 1,
        title: 'AI Project',
        description: 'Predictive analytics and deep learning model interface. (Coming Soon)',
        technologies: ['Python', 'TensorFlow', 'React'],
        image: 'assets/images/project1.png',
        github: '#',
        live: '#'
      },
      {
        id: 2,
        title: 'Machine Learning Model',
        description: 'A sophisticated dashboard for monitoring machine learning models. (Coming Soon)',
        technologies: ['Scikit-Learn', 'Node.js', 'D3.js'],
        image: 'assets/images/project2.png',
        github: '#',
        live: '#'
      },
      {
        id: 3,
        title: 'Web Development',
        description: 'Modern, responsive and performant full-stack web application. (Coming Soon)',
        technologies: ['Node.js', 'Express', 'MongoDB'],
        image: 'assets/images/project3.png',
        github: '#',
        live: '#'
      }
    ];

    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

const getSkills = (req, res, next) => {
  try {
    const skills = [
      { category: 'Programming', items: ['C', 'Python', 'JavaScript', 'Node.js'] },
      { category: 'AI', items: ['Artificial Intelligence', 'Machine Learning'] },
      { category: 'Web', items: ['HTML', 'CSS', 'Express.js'] },
      { category: 'Soft Skills', items: ['Communication', 'Teamwork', 'Leadership', 'Problem Solving'] }
    ];

    res.status(200).json({ success: true, data: skills });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  getSkills
};
