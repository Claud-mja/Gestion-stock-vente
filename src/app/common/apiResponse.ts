export interface ApiResponse<T> {
    data?: T; 
    message: string;
    statue: 'ok' | 'ko'; 
    desc?: any; 
  }
  