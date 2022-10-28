interface Props {
  url: string
  name: string
}
export const Media: React.FC<Props> = ({ url, name }) => {
  const width = 120
  const height = 150
  if (url.includes('.png')) {
    return (
      <picture>
        <source src={url} srcSet={url} width={width} height={height} />
        <img src="/fallback.jpg" alt={name} />
      </picture>
    )
  }

  return (
    <video width={width} height={height} autoPlay loop>
      <source src={url} type="video/mp4" />
      <source src={url} type="video/ogg" />
      Your browser does not support the video tag.
    </video>
  )
}
