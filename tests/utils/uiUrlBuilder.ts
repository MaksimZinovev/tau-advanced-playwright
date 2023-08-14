import uiPages from '../utils/uiPages';

export function buildUrl(page: string, params?: Record<any, any>) {
  const uiPath = uiPages[page];
  // console.log(`uiPath: ${uiPath}`)
  const qParams = new URLSearchParams(params);
  
  const url = params
  ? `${uiPath.concat('?')}${qParams.toString()}`
  : uiPath;
  
  /**
    * page  bookStore
    * uiPath  /books
    * params  { book: '9781449337711' }
    * qParams  URLSearchParams { 'book' => '9781449337711' }
    * url  /books?book=9781449337711
  */

  return url;
}
