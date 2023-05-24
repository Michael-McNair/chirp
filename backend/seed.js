let content = [
  {
    name: 'mikey',
    email: 'mikey@gmail.com',
    password: 'iammikey',
    posts: [
      'just lost my earphones yesterday',
      "McDonald's coffee doesn't taste good",
    ],
  },
  {
    name: 'layla',
    email: 'layla@gmail.com',
    password: 'iamlayla',
    posts: [
      "I'm looking fo a job please hire me I can code for food",
      "I'm at McDonald's and just noticed I forgot my earphones",
    ],
  },
  {
    name: 'xqc',
    email: 'xqc@gmail.com',
    password: 'iamxqc',
    posts: [
      "just beat forsen's minecraft peedrun record by far with a 16:38 run.",
      'where is my mclaren????',
    ],
  },
  {
    name: 'elon musk',
    email: 'elonmusk@gmail.com',
    password: 'iamelonmusk',
    posts: [
      'Trust nothing, not even nothing',
      "Excited to announce that I've hired a new CEO for X/Twitter. She will be starting in ~6 weeks!My role will transition to being exec chair & CTO, overseeing product, software & sysops.",
      'Twitter Blue Verified subscribers can now upload 2 hour videos (8GB)!',
    ],
  },
  {
    name: 'Dwayne Johnson',
    email: 'dwayneJohnson@gmail.com',
    password: 'iamdwaynejohnson',
    posts: ['Happy Mothers Day to all the mamas out there.'],
  },
  {
    name: 'MrBeast',
    email: 'mrbeast@gmail.com',
    password: 'iammrbeast',
    posts: [
      "I want to build other channels like beast gaming and beast reacts so I can run my main channel at a loss and grow as big as possible. And then use my main channel's influence to one day open hundreds of homeless shelters/food banks and give away all the money.",
      'We helped 1,000 deaf people hear again! Go watch :D',
      "Almost 4,000 hours of editing has gone into my next video.. brand new style, can't wait for all of you to see it Saturday :)",
    ],
  },
  {
    name: 'Cristiano Ronaldo',
    email: 'ronaldo@gmail.com',
    password: 'iamronaldo',
    posts: ['drink water', 'just won the world cup. thanks to my team.'],
  },
  {
    name: 'Magnus Carlson',
    email: 'magnus@gmail.com',
    password: 'iammagnus',
    posts: ['Love celebrating a win with a good Spotify session'],
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
