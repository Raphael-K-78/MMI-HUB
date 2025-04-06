<?php
function getDirectoryTree($dir) {
    $result = [];
    $files = scandir($dir);
    foreach ($files as $file) {
        if ($file === '.' || $file === '..') continue;
        $fullPath = $dir . DIRECTORY_SEPARATOR . $file;
        if (is_dir($fullPath)) {
            $result[] = [
                'name' => $file,
                'path' => $fullPath,  // chemin relatif
                'is_dir' => true,
                'children' => getDirectoryTree($fullPath)
            ];
        } else {
            $result[] = [
                'name' => $file,
                'path' => $fullPath,  // chemin relatif
                'is_dir' => false
            ];
        }
    }
    return $result;
}

$directory = 'src';
if (is_dir($directory)) {
    $tree = getDirectoryTree($directory);
    header('Content-Type: application/json');
    echo json_encode($tree);
} else {
    echo json_encode(['error' => "Le dossier '$directory' n'existe pas."]);
}
?>
