import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Github, Search, Loader2, Download } from "lucide-react";
import { toast } from "sonner";
import type { ProjectInsert } from "@/hooks/use-projects";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  stargazers_count: number;
  language: string | null;
}

interface GitHubImportProps {
  onImport: (projects: ProjectInsert[]) => void;
  isImporting?: boolean;
}

const GitHubImport = ({ onImport, isImporting }: GitHubImportProps) => {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);

  const fetchRepos = async () => {
    if (!username.trim()) return;
    setLoading(true);
    setRepos([]);
    setSelected(new Set());

    try {
      const res = await fetch(
        `https://api.github.com/users/${username.trim()}/repos?per_page=100&sort=updated`
      );
      if (!res.ok) throw new Error("User not found or API rate limited");
      const data: GitHubRepo[] = await res.json();
      setRepos(data.filter((r) => !r.name.startsWith(".")));
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleRepo = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleImport = () => {
    const projects: ProjectInsert[] = repos
      .filter((r) => selected.has(r.id))
      .map((r, i) => ({
        title: r.name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        description: r.description || `A ${r.language || "software"} project.`,
        tags: [
          ...(r.language ? [r.language] : []),
          ...r.topics.slice(0, 4),
        ],
        live_url: r.homepage || "",
        github_url: r.html_url,
        image_url: "",
        featured: r.stargazers_count > 5,
        visible: true,
        display_order: i,
      }));
    onImport(projects);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1">
          <Label htmlFor="gh-user" className="sr-only">GitHub Username</Label>
          <Input
            id="gh-user"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="GitHub username"
            onKeyDown={(e) => e.key === "Enter" && fetchRepos()}
          />
        </div>
        <Button onClick={fetchRepos} disabled={loading || !username.trim()}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
        </Button>
      </div>

      {repos.length > 0 && (
        <>
          <p className="text-sm text-muted-foreground">
            {repos.length} repos found — select which to import ({selected.size} selected)
          </p>
          <div className="max-h-[50vh] overflow-y-auto space-y-2 pr-1 overscroll-contain"
               style={{ WebkitOverflowScrolling: 'touch' }}>
            {repos.map((repo) => (
              <Card
                key={repo.id}
                className={`cursor-pointer transition-colors ${
                  selected.has(repo.id) ? "border-primary bg-primary/5" : ""
                }`}
                onClick={() => toggleRepo(repo.id)}
              >
                <CardContent className="p-3 flex items-start gap-3">
                  <Checkbox
                    checked={selected.has(repo.id)}
                    onCheckedChange={() => toggleRepo(repo.id)}
                    className="mt-0.5"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Github className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span className="font-medium text-foreground text-sm truncate">{repo.name}</span>
                      {repo.language && (
                        <span className="text-xs px-1.5 py-0.5 bg-accent text-accent-foreground rounded-full shrink-0">
                          {repo.language}
                        </span>
                      )}
                    </div>
                    {repo.description && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{repo.description}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button
            onClick={handleImport}
            disabled={selected.size === 0 || isImporting}
            className="w-full"
          >
            <Download className="w-4 h-4 mr-2" />
            Import {selected.size} Project{selected.size !== 1 ? "s" : ""}
          </Button>
        </>
      )}
    </div>
  );
};

export default GitHubImport;
