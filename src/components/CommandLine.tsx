import { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import SkillsTable from './SkillsTable';
import GitHubRepos from './GitHubRepos';
import AutocompleteInput from './AutocompleteInput';
import useIsMobile from '../hooks/useIsMobile';

interface HistoryEntry {
  command: string;
  output?: React.ReactNode;
}

const CommandLine: React.FC = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [currentInput, setCurrentInput] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const commands = ['help', 'list skills', 'list github_repos', 'clear'];

  const candidate = commands.find(cmd => cmd.startsWith(currentInput) && cmd !== currentInput);
  const suggestionText = candidate ? candidate.substring(currentInput.length) : '';

  useEffect(() => {
    if (!isMobile) {
      inputRef.current?.focus();
    }
  }, [isMobile]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const processCommand = (command: string) => {
    const trimmed = command.trim();
    if (!trimmed) return;

    if (trimmed.toLowerCase() === 'clear') {
      setHistory([]);
      return;
    }

    let output: React.ReactNode;
    switch (trimmed.toLowerCase()) {
      case 'help':
        output = (
          <div>
            <p>Comandos disponíveis:</p>
            <p className="ml-4">- help: Exibe os comandos disponíveis</p>
            <p className="ml-4">- list skills: Exibe a tabela de conhecimentos</p>
            <p className="ml-4">- list github_repos: Exibe os repositórios do GitHub</p>
            <p className="ml-4">- clear: Limpa o terminal</p>
          </div>
        );
        break;
      case 'list skills':
        output = <SkillsTable />;
        break;
      case 'list github_repos':
        output = <GitHubRepos />;
        break;
      default:
        output = <p>Comando não encontrado: {trimmed}</p>;
        break;
    }

    const newEntry: HistoryEntry = { command: trimmed, output };
    setHistory(prev => [...prev, newEntry]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processCommand(currentInput);
    setCurrentInput('');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestionText) {
        setCurrentInput(currentInput + suggestionText);
      }
    }
  };

  const renderMobileMenu = () => (
    <div className="flex flex-wrap gap-2 mt-4">
      <button
        onClick={() => processCommand('help')}
        className="bg-gray-800 text-green-500 px-3 py-1 rounded hover:bg-gray-700"
      >
        Help
      </button>
      <button
        onClick={() => processCommand('list skills')}
        className="bg-gray-800 text-green-500 px-3 py-1 rounded hover:bg-gray-700"
      >
        List Skills
      </button>
      <button
        onClick={() => processCommand('list github_repos')}
        className="bg-gray-800 text-green-500 px-3 py-1 rounded hover:bg-gray-700"
      >
        List GitHub Repos
      </button>
      <button
        onClick={() => processCommand('clear')}
        className="bg-gray-800 text-green-500 px-3 py-1 rounded hover:bg-gray-700"
      >
        Clear
      </button>
    </div>
  );

  return (
    <div className="text-green-500">
      {history.map((entry, index) => (
        <div key={index}>
          <p>C:\&gt; {entry.command}</p>
          {entry.output && <div className="ml-4">{entry.output}</div>}
        </div>
      ))}

      {isMobile ? (
        renderMobileMenu()
      ) : (
        <form onSubmit={handleSubmit} className="mt-4">
          <span>C:\&gt;&nbsp;</span>
          <AutocompleteInput
            value={currentInput}
            suggestion={suggestionText}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            inputRef={inputRef}
          />
        </form>
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default CommandLine;
