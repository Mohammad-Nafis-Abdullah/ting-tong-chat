import { UserSchema } from "../schema/schema";

export interface StateSchema{
  current_friend : UserSchema | null,
  current_user: UserSchema | null,
}


export interface ActionSchema{
  type: keyof StateSchema,
  payload: StateSchema[ActionSchema['type']],
}

export interface useGlobalStateReturn{
  state:StateSchema,
  setState:(key:ActionSchema['type'],value:ActionSchema['payload'])=>void
}