package org.example.solutionpuzzle.service;

import org.example.solutionpuzzle.entity.Solution;
import org.example.solutionpuzzle.repository.SolutionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.*;

@Service
public class SolutionService {
    @Autowired
    private SolutionRepository solutionRepository;

    // Fonction pour vérifier si la solution satisfait l'équation
    public static boolean verifyEquation(int A, int B, int C, int D, int E, int F, int G, int H, int I) {
        if (C != 0 && I != 0) { // Assurer que C et I ne soient pas 0 pour éviter la division par zéro
            double equation = A + (13.0 * B / C) + D + (12.0 * E) - F - 11 + (1.0 * G * H / I) - 10;
            return equation == 66;
        }
        return false;
    }

    // Fonction principale pour générer les permutations et tester l'équation
    public static List<Solution> findSolutions() {
        int[] digits = {1, 2, 3, 4, 5, 6, 7, 8, 9};
        List<int[]> solutions = new ArrayList<>();

        // Obtenir toutes les permutations des chiffres 1 à 9
        permute(digits, 0, solutions);

        System.out.println("Nombre de solutions: " + solutions.size());
        for (int[] solution : solutions) {
            System.out.printf("A=%d, B=%d, C=%d, D=%d, E=%d, F=%d, G=%d, H=%d, I=%d\n",
                    solution[0], solution[1], solution[2], solution[3], solution[4],
                    solution[5], solution[6], solution[7], solution[8]);
        }
        // Transformer les solutions en objets Solution
        List<Solution> solutionList = new ArrayList<>();
        for (int[] solution : solutions) {
            Solution s = new Solution();
            s.setGrid(Arrays.toString(solution));
            s.setStatus("correct");
            solutionList.add(s);
        }
        return solutionList;
    }

    // Fonction pour générer les permutations des chiffres (backtracking)
    public static void permute(int[] array, int index, List<int[]> solutions) {
        if (index == array.length) {
            // Si une permutation est complète, tester l'équation avec cette permutation
            int A = array[0], B = array[1], C = array[2], D = array[3], E = array[4];
            int F = array[5], G = array[6], H = array[7], I = array[8];

            if (verifyEquation(A, B, C, D, E, F, G, H, I)) {
                solutions.add(array.clone());
            }
        } else {
            // Générer les permutations par échange de valeurs
            for (int i = index; i < array.length; i++) {
                swap(array, index, i);
                permute(array, index + 1, solutions);
                swap(array, index, i); // Revenir à l'état précédent (backtrack)
            }
        }
    }

    // Fonction pour échanger deux éléments d'un tableau
    public static void swap(int[] array, int i, int j) {
        int temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    public List<Solution> getAllSolutions() {
        return solutionRepository.findAll();
    }

    public Optional<Solution> getSolutionById(Long id) {
        return solutionRepository.findById(id);
    }

    public Solution saveSolution(Solution solution) {
        return solutionRepository.save(solution);
    }

    public void deleteSolutionById(Long id) {
        solutionRepository.deleteById(id);
    }

    public void deleteAllSolutions() {
        solutionRepository.deleteAll();
    }

    public void saveAll(List<Solution> solutions) {
        solutionRepository.saveAll(solutions);
    }
}
