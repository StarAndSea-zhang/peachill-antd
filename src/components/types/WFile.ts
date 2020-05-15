export interface WFile {
  uid?: string;
  name: string;
  url: string;
  size?: number;
  type?: string;
}

interface FileConfig {
  extensions: Array<string>;
  folder: string;
}

class DOCFileConfig implements FileConfig {
  doc: string = 'application/msword';
  docx: string =
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  extensions: Array<string> = ['doc', 'docx'];
  folder: string = 'doc';
}

class ImageConfig implements FileConfig {
  gif: string = 'image/gif';
  jpe: string = 'image/jpeg';
  jpegstring = 'image/jpeg';
  jpg: string = 'image/jpeg';
  svg: string = 'image/svg+xml';
  extensions: Array<string> = ['jpg', 'jpeg', 'png', 'gif'];
  folder: string = 'image';
}

class PDFFileConfig implements FileConfig {
  pdf: string = 'application/pdf';
  extensions: Array<string> = ['pdf'];
  folder: string = 'pdf';
}

class EXCELFileConfig implements FileConfig {
  xlc: string = 'application/vnd.ms-excel';
  xls: string = 'application/vnd.ms-excel';
  xlsxstring =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  extensions: Array<string> = ['xls', 'xlsx'];
  folder: string = 'excel';
}

class ZIPFileConfig implements FileConfig {
  zip: string = 'application/zip';
  extensions: Array<string> = ['zip'];
  folder: string = 'zip';
}

class MimeTypeConfig {
  constructor() {}
  //声明key string 类型不然报错
  [key: string]: any;
  readonly DOC: DOCFileConfig = new DOCFileConfig();
  readonly IMAGE: ImageConfig = new ImageConfig();
  readonly PDF: PDFFileConfig = new PDFFileConfig();
  readonly ZIP: ZIPFileConfig = new ZIPFileConfig();
  readonly EXCEL: EXCELFileConfig = new EXCELFileConfig();
}

export const MIMETYPE = new MimeTypeConfig();
