import { User } from "../model/type"
import { UserAvatar } from "./UserAvatar"
import { UserInfo } from "./UserInfo"

interface UserProfileProps {
  user: User
}

export const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <div className="space-y-4">
      <UserAvatar image={user.image} username={user.username} size="lg" />
      <h3 className="text-xl font-semibold text-center">{user.username}</h3>
      <UserInfo user={user} />
    </div>
  )
}
