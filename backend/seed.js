let content = [
  {
    name: 'john',
    email: 'john@gmail.com',
    password: 'iamjohn',
    posts: [
      'Feeling excited about my upcoming vacation!',
      'Just finished reading a great book, highly recommend it!',
    ],
  },
  {
    name: 'emily',
    email: 'emily@gmail.com',
    password: 'iamemily',
    posts: [
      'Had a productive day at work today!',
      'Watching my favorite movie for the hundredth time.',
    ],
  },
  {
    name: 'alice',
    email: 'alice@gmail.com',
    password: 'iamalice',
    posts: [
      'Visited a new restaurant last night, the food was amazing!',
      'Looking forward to spending the weekend with friends.',
    ],
  },
  {
    name: 'jack',
    email: 'jack@gmail.com',
    password: 'iamjack',
    posts: [
      'Just finished a long workout session at the gym.',
      'Trying out a new hobby, painting.',
    ],
  },
  {
    name: 'sarah',
    email: 'sarah@gmail.com',
    password: 'iamsarah',
    posts: [
      'Enjoying the sunny weather at the beach.',
      'Cooked a delicious dinner for my family.',
    ],
  },
  {
    name: 'michael',
    email: 'michael@gmail.com',
    password: 'iammichael',
    posts: [
      'Binge-watching my favorite TV show.',
      'Learning to play the guitar.',
    ],
  },
  {
    name: 'olivia',
    email: 'olivia@gmail.com',
    password: 'iamolivia',
    posts: [
      'Just got back from a road trip with friends.',
      'Starting a new fitness challenge.',
    ],
  },
  {
    name: 'david',
    email: 'david@gmail.com',
    password: 'iamdavid',
    posts: [
      'Studying for my upcoming exams.',
      'Trying out a new recipe for dinner tonight.',
    ],
  },
  {
    name: 'emma',
    email: 'emma@gmail.com',
    password: 'iamemma',
    posts: [
      'Exploring new hiking trails in the area.',
      'Attending a concert tonight, can’t wait!',
    ],
  },
  {
    name: 'james',
    email: 'james@gmail.com',
    password: 'iamjames',
    posts: [
      'Just adopted a new puppy!',
      'Celebrating my birthday with friends and family.',
    ],
  },
  {
    name: 'oliver',
    email: 'oliver@gmail.com',
    password: 'iamoliver',
    posts: [
      'Completed a DIY project at home.',
      'Reading a fascinating book on neuroscience.',
    ],
  },
  {
    name: 'ava',
    email: 'ava@gmail.com',
    password: 'iamava',
    posts: [
      'Trying out a new yoga class.',
      'Planning a trip to Europe next summer.',
    ],
  },
  {
    name: 'william',
    email: 'william@gmail.com',
    password: 'iamwilliam',
    posts: [
      'Enjoying a quiet evening at home with a good book.',
      'Cooking dinner for friends tonight.',
    ],
  },
  {
    name: 'charlotte',
    email: 'charlotte@gmail.com',
    password: 'iamcharlotte',
    posts: [
      'Just finished a marathon!',
      'Attending a charity event this weekend.',
    ],
  },
  {
    name: 'noah',
    email: 'noah@gmail.com',
    password: 'iamnoah',
    posts: [
      'Starting a new project at work.',
      'Volunteering at the local animal shelter.',
    ],
  },
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function registerAndGetJWT(user) {
  try {
    const response = await fetch('http://localhost:3000/api/v1/register', {
      method: 'POST',
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        password: user.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    const token = data.token;

    user.token = token;
  } catch (error) {
    console.error('Error registering and obtaining JWT:', error);
  }
}

async function createPost(post) {
  try {
    const response = await fetch('http://localhost:3000/api/v1/posts', {
      method: 'POST',
      body: JSON.stringify({
        textContent: post.post,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${post.token}`,
      },
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error creating post:', error);
  }
}

async function seed(content) {
  for (const user of content) {
    await registerAndGetJWT(user);
  }

  let posts = [];

  content.forEach((user) => {
    user.posts.forEach((post) => {
      posts.push({
        name: user.name,
        email: user.email,
        password: user.password,
        token: user.token,
        post,
      });
    });
  });

  posts = shuffle(posts);

  for (const post of posts) {
    await createPost(post);
  }
}

seed(content);
