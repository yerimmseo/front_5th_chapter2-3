interface UserAvatarProps {
  image?: string
  username: string
  size: "md" | "lg"
}

export const UserAvatar = ({
  image = "",
  username,
  size = "md",
}: UserAvatarProps) => {
  const sizeClasses = {
    md: "w-8 h-8",
    lg: "w-24 h-24",
  }

  const avatarClass = `rounded-full mx-auto ${sizeClasses[size]}`

  return <img src={image} alt={username} className={avatarClass} />
}
