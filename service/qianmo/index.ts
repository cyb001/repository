import {get, IOnTTSEnd, post, ssePost, del} from '../base'

export const fetchAgentList = async () => {
  return get('dify/agent');
}
export const fetchKnowledgeList = async () => {
  return get('dify/knowledge');
}
