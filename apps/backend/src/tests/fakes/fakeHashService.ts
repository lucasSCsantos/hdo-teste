export default class FakeHashService {
  async compare(payload: string, hashed: string) {
    return payload === 'password123';
  }
}
