export function getDefaultMapboxToken() {
  try {
    return atob(
      'cGsuZXlKMUlqb2lhV3RsY214MWJtRWlMQ0poSWpvaVkyMDNOak13WkhwdE1IQXphREpyY1hscmJuTnVNSEpsWmlKOS5oa29SbE02Z1EtQmZsY0dqcEk0MEdB',
    )
  } catch {
    return ''
  }
}
