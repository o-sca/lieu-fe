export interface RequestUser {
  user_id: number;
  username: string;
  user_type: string;
  request_count: number;
}

export interface Endpoint {
  path: string;
  method: string;
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
