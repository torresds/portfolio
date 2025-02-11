import { useState, useEffect } from 'react';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
}

const GitHubRepos: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetch('https://api.github.com/users/torresds/repos')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao buscar repositórios');
        }
        return response.json();
      })
      .then(data => {
        setRepos(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Carregando repositórios...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <div className="mt-4">
      <h2 className="mb-2">Meus Repositórios no GitHub:</h2>
      <ul className="list-disc ml-6">
        {repos.map(repo => (
          <li key={repo.id} className="mb-1">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              {repo.name}
            </a>
            {repo.description && (
              <p className="text-sm text-gray-400">{repo.description}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GitHubRepos;
