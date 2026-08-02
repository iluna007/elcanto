import LogoSplash from './LogoSplash'

function PageLoader() {
  return (
    <LogoSplash
      phase="ready"
      className="map-intro--page-loader"
      showHint={false}
    />
  )
}

export default PageLoader
