import { getResponsiveImageProps } from '../utils/responsiveImage'

function ResponsiveImage({
  src,
  alt = '',
  sizes,
  className,
  loading,
  fetchPriority,
  decoding = 'async',
  ...rest
}) {
  const { src: responsiveSrc, srcSet } = getResponsiveImageProps(src)

  return (
    <img
      src={responsiveSrc}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      className={className}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding={decoding}
      {...rest}
    />
  )
}

export default ResponsiveImage
