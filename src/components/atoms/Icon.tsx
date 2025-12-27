import {
  Download,
  CheckCircle,
  XCircle,
  X,
  AlertTriangle,
  Info,
  AlertCircle,
  Bell,
  Mail,
  Clock,
} from "lucide-react-native"

export type IconName =
  | "download"
  | "check"
  | "close"
  | "error"
  | "warning"
  | "info"
  | "alert"
  | "bell"
  | "mail"
  | "clock"

interface IconProps {
  name: IconName
  size?: number
  color?: string
}

export const Icon = ({ name, size = 24, color = "#FFFFFF" }: IconProps) => {
  const renderIcon = () => {
    switch (name) {
      case "download":
        return <Download size={size} color={color} />
      case "check":
        return <CheckCircle size={size} color={color} />
      case "error":
        return <XCircle size={size} color={color} />
      case "close":
        return <X size={size} color={color} />
      case "warning":
        return <AlertTriangle size={size} color={color} />
      case "info":
        return <Info size={size} color={color} />
      case "alert":
        return <AlertCircle size={size} color={color} />
      case "bell":
        return <Bell size={size} color={color} />
      case "mail":
        return <Mail size={size} color={color} />
      case "clock":
        return <Clock size={size} color={color} />
      default:
        return null
    }
  }

  return renderIcon()
}
