export interface Endpoint {
  path: string;
  count: number;
}

export interface TrackedRequest {
  request_id: number;
  user_id: number;
  createdAt: string;
  input: string;
  output: string;
}

export interface TrackedRequestAdmin extends TrackedRequest {
  username: string;
  user_type: string;
}
