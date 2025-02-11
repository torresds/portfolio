interface Skill {
  name: string;
  level: string;
}

const skills: Skill[] = [
  { name: 'JavaScript/Typescript', level: 'Capaz de desenvolver projetos reais' },
  { name: 'React', level: 'Capaz de desenvolver projetos reais' },
  { name: 'Vue', level: 'Capaz de desenvolver projetos reais' },
  { name: 'Next.js', level: 'Capaz de desenvolver projetos reais' },
  { name: 'Lua', level: 'Uma linguagem de hobby, não adaptado ao desenvolvimento de grandes projetos' },
];

const SkillsTable: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            <th className="border border-green-500 px-2 py-1 text-left">Conhecimento</th>
            <th className="border border-green-500 px-2 py-1 text-left">Nível</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill, index) => (
            <tr key={index}>
              <td className="border border-green-500 px-2 py-1">{skill.name}</td>
              <td className="border border-green-500 px-2 py-1">{skill.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkillsTable;
