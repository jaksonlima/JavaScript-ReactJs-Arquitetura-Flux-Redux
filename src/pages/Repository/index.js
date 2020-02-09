import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Loading, Owner, IssueList } from './styles';
import api from '../../services/api';
import Container from '../../components/Container/styles';
import { isNotNullOrEmpty } from '../../Utils/ArrayUtil/Array';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repositorys: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repositorys: {},
    issues: [],
    loading: true,
  };

  async componentDidMount() {
    const { match, ...rest } = this.props;

    const pathRepoName = decodeURIComponent(match.params.repository);

    const [repositorio, issues] = await Promise.all([
      api.get(`/repos/${pathRepoName}`),
      api.get(`/repos/${pathRepoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    setTimeout(
      () =>
        this.setState({
          repositorys: repositorio.data,
          issues: issues.data,
          loading: false,
        }),
      1000
    );
  }

  render() {
    const { repositorys, issues, loading } = this.state;

    // console.log(repositorys);
    // console.log(issues);
    if (loading) {
      return <Loading>Loading</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img
            src={repositorys.owner.avatar_url}
            alt={repositorys.owner.login}
          />
          <h1>{repositorys.name}</h1>
          <p>{repositorys.description}</p>
        </Owner>
        {isNotNullOrEmpty(issues) && (
          <IssueList>
            {issues.map(issue => (
              <li key={String(issue.id)}>
                <img src={issue.user.avatar_url} alt={issue.user.login} />
                <div>
                  <strong>
                    <a href={issue.html_url}>{issue.title}</a>
                    {isNotNullOrEmpty(issue.labels) &&
                      issue.labels.map(label => (
                        <span key={String(label.id)}>{label.name}</span>
                      ))}
                  </strong>
                  <p>{issue.user.login}</p>
                </div>
              </li>
            ))}
          </IssueList>
        )}
      </Container>
    );
  }
}
