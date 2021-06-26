class ManageUser {
    // Of course in our real class we'll also inject and tie up
    // our other user services (such as GetUser for instance...)
    constructor ({ createUser, updateUser, userListener }) {
      this.createUser = createUser.exec.bind(createUser)
      this.updateUser = updateUser.exec.bind(updateUser)
      
      const listener = userListener.onUserCreated.bind(userListener)
      
      createUser.on(createUser.events.USER_CREATED, listener)
    }
}