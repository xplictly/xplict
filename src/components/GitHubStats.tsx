import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

interface GitHubStats {
  followers: number;
  publicRepos: number;
  totalStars: number;
  loading: boolean;
  error: boolean;
}

export const GitHubStats = () => {
  const [stats, setStats] = useState<GitHubStats>({
    followers: 0,
    publicRepos: 0,
    totalStars: 0,
    loading: true,
    error: false,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch user stats
        const userResponse = await fetch('https://api.github.com/users/xplictly');
        if (!userResponse.ok) {
          throw new Error(`User API failed: ${userResponse.status}`);
        }
        const userData = await userResponse.json();

        // Fetch repos for star count
        const reposResponse = await fetch('https://api.github.com/users/xplictly/repos?per_page=100');
        if (!reposResponse.ok) {
          throw new Error(`Repos API failed: ${reposResponse.status}`);
        }
        const reposData = await reposResponse.json();

        if (!Array.isArray(reposData)) {
          throw new Error('Repositories data is not an array.');
        }

        interface GitHubRepository {
          stargazers_count: number;
        }

        const totalStars = reposData.reduce((sum: number, repo: GitHubRepository) => sum + (repo.stargazers_count || 0), 0);

        setStats({
          followers: userData.followers || 0,
          publicRepos: userData.public_repos || 0,
          totalStars,
          loading: false,
          error: false,
        });
      } catch (error) {
        console.error('Failed to fetch GitHub stats:', error);
        setStats((prev) => ({ ...prev, loading: false, error: true }));
      }
    };

    fetchStats();
  }, []);

  if (stats.loading) {
    return (
      <div className="flex items-center gap-8">
        <div className="h-12 w-20 bg-secondary rounded-lg animate-pulse" />
        <div className="h-12 w-20 bg-secondary rounded-lg animate-pulse" />
        <div className="h-12 w-20 bg-secondary rounded-lg animate-pulse" />
      </div>
    );
  }

  const statItems = [
    { label: 'Followers', value: stats.followers },
    { label: 'Repos', value: stats.publicRepos },
    { label: 'Stars', value: stats.totalStars },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex items-center gap-8 flex-wrap"
    >
      <div className="flex items-center gap-2 text-muted-foreground">
        <Github size={20} />
        <span className="text-sm">GitHub Stats</span>
      </div>
      {statItems.map((item, index) => (
        <motion.div
          key={item.label}
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <div className="text-2xl md:text-3xl font-bold text-foreground">
            {stats.error ? '—' : item.value}
          </div>
          <div className="text-xs md:text-sm text-muted-foreground">{item.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
};
