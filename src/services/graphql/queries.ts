import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query GetTasks($filter: TaskFilter) {
    tasks(filter: $filter) {
      id
      title
      description
      status
      priority
      createdAt
      updatedAt
      assignee
      tags
    }
  }
`;

export const GET_TASK_BY_ID = gql`
  query GetTaskById($id: ID!) {
    task(id: $id) {
      id
      title
      description
      status
      priority
      createdAt
      updatedAt
      assignee
      tags
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      avatar
    }
  }
`;

