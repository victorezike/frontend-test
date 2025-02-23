export interface UnsplashPhotoData {
  id: string
  urls: {
    raw: string
    full: string
    regular: string
    small: string
    thumb: string
  }
  alt_description: string
  user: {
    id: string
    name: string
    username: string
    profile_image: {
      small: string
      medium: string
      large: string
    }
    location?: string
  }
  likes: number
  created_at: string
  width: number
  height: number
  links: {
    download: string
    html: string
  }
}
