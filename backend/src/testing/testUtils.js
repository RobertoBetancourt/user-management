async function clearData (prisma) {
  const users = await prisma.user.findMany({})

  const deleteUser = async (user) => {
    return await prisma.user.delete({
      where: { id: user.id }
    })
  }

  const deleteUsers = async () => {
    return Promise.all(users.map((user) => deleteUser(user)))
  }

  await deleteUsers()
}

module.exports = {
  clearData
}
