import dfs_bfs from "./dfs_bfs";

export default function bfs(graph, src, des) {
	return dfs_bfs(graph, src, des, "bfs");
}