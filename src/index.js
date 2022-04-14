function userLogin() {
  return new Promise((resolve) => VK.Auth.login(resolve));
}

function promisingVkCall(type, options) {
  return new Promise((resolve) => VK.Api.call(type, options, resolve)).then(
    (res) => res.response
  );
}

async function loginVKreturnFriends() {
  const loginResponse = await userLogin();
  const friendsID = await promisingVkCall("friends.get", { v: "5.131" });
  const friends = await promisingVkCall('users.get', {user_ids: friendsID.items, fields: 'photo_50', v:"5.131"})
  return friends;
}

function getFriends() {
  return loginVKreturnFriends()
    .then((data) => {
      const friendList = []
      data.forEach((friend) => {
        friendList.push({name: friend.first_name, secondname: friend.last_name, photo:friend.photo_50});
      })
      return friendList;
    })
}
