import { EventEmitter } from 'events'

import User from '../../domain/user'

class createUser extends EventEmitter {
  constructor ({ userRepository }) {
    super()
    this.userRepository = userRepository
    this.events = { USER_CREATED: 'USER_CREATED' }
  }

  async exec ({ email, username, password, sponsor }) {
    // We're skipping password encoding here for simplicity
    // but of course you wouldn't want to do that for real!
    const userEntity = new User(email, username, password)
    const user = await this.userRepository.create(userEntity)

    this.emit(this.events.USER_CREATED, { user, sponsor })

    return user    
  }
}