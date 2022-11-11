export interface Id {
  value: string;
}

export interface Content {
  value: string;
}

export interface Cve {
  value: string;
}

export interface Date {
  value: string;
}

export interface FileName {
  value: string;
}

export interface Path {
  value: string;
}

export interface Tag {
  value: string;
}

export interface Title {
  value: string;
}

export interface HighlightResult {
  id: Id;
  content: Content;
  cve: Cve;
  date: Date;
  file_name: FileName;
  path: Path;
  tag: Tag;
  title: Title;
}

export interface Id2 {
  value: string;
}

export interface Content2 {
  value: string;
}

export interface Cve2 {
  value: string;
}

export interface Date2 {
  value: string;
}

export interface FileName2 {
  value: string;
}

export interface Path2 {
  value: string;
}

export interface Tag2 {
  value: string;
}

export interface Title2 {
  value: string;
}

export interface SnippetResult {
  id: Id2;
  content: Content2;
  cve: Cve2;
  date: Date2;
  file_name: FileName2;
  path: Path2;
  tag: Tag2;
  title: Title2;
}

export default interface Hit {
  id: string;
  content: string;
  cve: string;
  date: string;
  file_name: string;
  path: string;
  tag: string;
  title: string;
  _highlightResult: HighlightResult;
  _snippetResult: SnippetResult;
  __position: number;
}