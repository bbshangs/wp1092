const getTime = () => {
    return new Date().toISOString().replace(/T/, '-').replace(/\..+/, '').replace(/:/g, '-')
}

export default getTime
  