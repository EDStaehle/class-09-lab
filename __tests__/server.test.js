const {app} = require('../src/server');
const supertest = require('supertest');
const {db, users} = require('../src/auth/models/index');


const request = supertest(app);
let userData = {
  testUser: { username: 'user', password: 'password' },
};


beforeAll(async () => {
  await db.sync();
  testUser = await users.create({
    username: 'jhon cena',
    password: 'cantseeme',
    role: 'admin',
  });
});
afterAll(async () => {
  await db.drop()
})
describe('auth and api works as expected', () => {
  it('allows user to signup', async () => {
    const response = await request.post('/signup').send(userData.testUser);
    const userObject = response.body;

    expect(response.status).toBe(201);
    expect(userObject.token).toBeDefined();
    expect(userObject.user.id).toBeDefined();
    expect(userObject.user.username).toEqual(userData.testUser.username);
  });
  it('can signin', async () =>{
    let { username, password } = userData.testUser;
    let response = await request.post('/signin').auth(username, password);
    let userObject = response.body;
    expect(response.status).toBe(200);
    expect(userObject.token).toBeDefined();
    expect(userObject.user.id).toBeDefined();
    expect(userObject.user.username).toEqual(username);
  });
  it('users with create access can post', async () => {
    let response = await request.post('/api/v1/food').set('Authorization', `Bearer ${testUser.token}`).send({
      type: 'test',
      name:'fruit',
      calories: 1000,
    });
    expect(response.status).toBe(201);
    expect(response.body.type).toEqual('test')
    expect(response.body.name).toEqual('fruit')
    expect(response.body.calories).toEqual(1000)
  });
  it('users with create access can edit', async () => {
    let response = await request.put('/api/v1/food/1').set('Authorization', `Bearer ${testUser.token}`).send({
      type: 'tests',
      name:'fruit',
      calories: 1000,
    });
    expect(response.status).toBe(200);
    expect(response.body.type).toEqual('tests')
    expect(response.body.name).toEqual('fruit')
    expect(response.body.calories).toEqual(1000)
  });
  it('users with create access can read', async () => {
    let response = await request.get('/api/v1/food').set('Authorization', `Bearer ${testUser.token}`);
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body[0].type).toEqual('tests')
    expect(response.body[0].name).toEqual('fruit')
    expect(response.body[0].calories).toEqual(1000)
  });
  it('users with create access can delete', async () => {
    let response = await request.delete('/api/v1/food/1').set('Authorization', `Bearer ${testUser.token}`);
    expect(response.status).toBe(200);

  });
  it('users with create access can post', async () => {
    let response = await request.post('/api/v1/desserts').set('Authorization', `Bearer ${testUser.token}`).send({
      type: 'test',
      flavor: 'red',
      occasion:'lg'
    });
    expect(response.status).toBe(500);
    expect(response.body.type).toEqual('test')
    expect(response.body.flavor).toEqual('red')
    expect(response.body.occasion).toEqual('lg')
  });
  it('users with create access can edit', async () => {
    let response = await request.put('/api/v1/desserts/1').set('Authorization', `Bearer ${testUser.token}`).send({
      name: 'tests',
     flavor: 'red',
     occasion: 'bday'
    });
    expect(response.status).toBe(200);
    expect(response.body.name).toEqual('tests')
    expect(response.body.flavor).toEqual('red')
    expect(response.body.occasion).toEqual('bday')
  });
  it('users with create access can read', async () => {
    let response = await request.get('/api/v1/desserts').set('Authorization', `Bearer ${testUser.token}`);
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body[0].name).toEqual('tests')
    expect(response.body[0].flavor).toEqual('red')
    expect(response.body[0].occasion).toEqual('bday')
  });
  it('users with create access can delete', async () => {
    let response = await request.delete('/api/v1/desserts/1').set('Authorization', `Bearer ${testUser.token}`);
    expect(response.status).toBe(200);

  });
})
