import dfs_bfs from "./dfs_bfs";

export default function dfs(graph, src, des) {
	return dfs_bfs(graph, src, des, "dfs");
}